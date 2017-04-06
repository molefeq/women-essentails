using Libraries.ErrorLog;
using Libraries.ErrorLog.ErrorLoggers;
using Libraries.ErrorLog.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net.Http;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http.ExceptionHandling;
using Libraries.Common.Extensions;
using System;
using System.IO;
using System.Reflection;
using System.Text;
using Libraries.ErrorLog.CustomExceptions;

namespace WomenEssentail.ServiceBusinessRules.ExceptionHandlers
{
    public class GlobalExceptionLogger : ExceptionLogger
    {
        public override async Task LogAsync(ExceptionLoggerContext context, CancellationToken cancellationToken)
        {
            await LogExceptionAsync(context);
        }
        public async Task LogExceptionAsync(ExceptionLoggerContext exceptionLoggerContext)
        {

            ErrorLogModel errorLogModel = new ErrorLogModel();
            //ErrorLogger errorLogger = new ErrorLogger(new DatabaseErrorLogger(), new EmailErrorFileFactory(new ErrorFileContentFactory()));
            IDictionary<string, object> routeValues = exceptionLoggerContext.RequestContext.RouteData.Values;
            string area = routeValues["area"] == null ? "" : routeValues["area"].ToString() + "/";
            string controller = routeValues["controller"] == null ? "" : routeValues["controller"].ToString() + "/";
            string action = routeValues["action"] == null ? "" : routeValues["action"].ToString();

            errorLogModel.Source = exceptionLoggerContext.Request.RequestUri.OriginalString;
            errorLogModel.MethodName = area + controller + action;
            errorLogModel.Exception = exceptionLoggerContext.Exception;
            errorLogModel.ConnectionString = ConfigurationManager.ConnectionStrings["SQSWomenEssentailConnectionString"].ConnectionString;
            errorLogModel.Directory = System.Web.HttpContext.Current.Server.MapPath(ConfigurationManager.AppSettings["ExceptionLogDirectory"]);
            errorLogModel.Parameters = await exceptionLoggerContext.Request.Content.ReadAsStringAsync();
            LogError(errorLogModel);
        }

        private void LogError(ErrorLogModel errorLogModel)
        {
            string errorFileName = SetErrorFileName(errorLogModel.Exception, errorLogModel.Directory);
            ErrorFileContentFactory _fileContentFactory  = new ErrorFileContentFactory();

            if (File.Exists(errorFileName))
            {
                throw new ErrorLogException("Error with the logging please make sure that the file you writing to does not exist.") { OriginalException = errorLogModel.Exception };
            }

            using (FileStream fileStream = File.Create(errorFileName))
            {
                string errorParamaters = errorLogModel.Method.GetMethodParameters(errorLogModel.MethodParameters);
                byte[] fileData = Encoding.ASCII.GetBytes(_fileContentFactory.Create(errorLogModel.Exception, errorLogModel.Source, errorParamaters));

                // Add some information to the file.
                fileStream.Write(fileData, 0, fileData.Length);
            }
        }

        #region Private Methods

        private void CreateTextFile(Exception exception, string errorSource, MethodBase methodBase, string methodName, Guid? userId, params object[] methodParameters)
        {
            string errorParamaters = methodBase.GetMethodParameters(methodParameters);
        }

        private string SetErrorFileName(Exception originalException, string errorLogDirectory)
        {
            if (string.IsNullOrEmpty(errorLogDirectory))
            {
                throw new ErrorLogException("Error with the logging please make sure that you have the app settings key for: ErrorLogDirectory {0}") { OriginalException = originalException };
            }

            if (!Directory.Exists(errorLogDirectory))
            {
                throw new ErrorLogException(string.Format("Error with the logging please make sure that the direcorty for the app settings key of ErrorLogDirectory {0} exists", errorLogDirectory)) { OriginalException = originalException };
            }

            string subDirectory = DateTime.Now.DateToFilename();

            if (!Directory.Exists(Path.Combine(errorLogDirectory, subDirectory)))
            {
                Directory.CreateDirectory(Path.Combine(errorLogDirectory, subDirectory));
            }

            string errorFileNameWithoutExtension = DateTime.Now.DateTimeToFilename();
            int i = 0;

            while (File.Exists(Path.Combine(errorLogDirectory, subDirectory, errorFileNameWithoutExtension + ".txt")))
            {
                errorFileNameWithoutExtension = errorFileNameWithoutExtension + "_0" + i;
            }

            return Path.Combine(errorLogDirectory, subDirectory, errorFileNameWithoutExtension + ".txt");
        }

        #endregion
    }
}
