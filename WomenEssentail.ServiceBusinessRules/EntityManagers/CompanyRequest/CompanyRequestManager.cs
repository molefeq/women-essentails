using Libraries.Common.Email;
using Libraries.Common.Enums;
using Libraries.Common.ResponseObjects;

using System;
using System.Configuration;
using System.Text;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;

using WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyRequest.Mappers;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyRequests
{
    public class CompanyRequestManager : ICompanyRequestManager
    {
        public Result<CompanyRequestDto> GetCompanyRequests(SearchFilter searchFilter)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.CompanyRequests.Get(searchFilter, CompanyRequestMapper.Instance.MapToCompanyRequestDto);
            }
        }

        public Response<CompanyRequestDto> Save(CompanyRequestDto companyRequestDto)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                var response = unitOfWork.CompanyRequests.Save(companyRequestDto, CompanyRequestMapper.Instance.MapToCompanyRequestDto);

                if (response.HasErrors) return response;

                if (companyRequestDto.CrudStatus == CrudStatus.CREATE)
                {
                    SendCreateCompanyRequestEmail(response.Item);
                }

                return response;
            }
        }

        #region Private Methods

        private void SendCreateCompanyRequestEmail(CompanyRequestDto companyRequestDto)
        {

            string smtpServerAddress = ConfigurationManager.AppSettings["LiveSMTPAddress"];
            int smtpPortNumber = Convert.ToInt32(ConfigurationManager.AppSettings["LiveSMTPPortNumber"]);
            string fromAddress = ConfigurationManager.AppSettings["LiveEmailFrom"];
            string toAddress = ConfigurationManager.AppSettings["LiveEmailReciever"];
            string accountUserName = ConfigurationManager.AppSettings["LiveAccountUsername"];
            string accountPassword = ConfigurationManager.AppSettings["LiveAccountPassword"];

            string subject = string.Format("{0} Email notification ... Request to Join {0}!", ConfigurationManager.AppSettings["SiteName"]);

            StringBuilder sb = new StringBuilder();

            // Add email heading
            sb.Append(string.Format("Dear {0} Admin.", "Women's Essentails"));
            sb.Append("<br />");
            sb.Append("<br />");
            sb.Append(string.Format("This Email serves a notification for a new request to join Women's Essentails, from the following entity."));
            sb.Append("<br />");
            sb.Append("<br />");
            sb.Append(string.Format("Contact Name: {0} {1}", companyRequestDto.FirstName, companyRequestDto.LastName));
            sb.Append("<br />");
            sb.Append(string.Format("Address: {0}", companyRequestDto.PhysicalAddress));
            sb.Append("<br />");
            sb.Append(string.Format("Contact Number: {0}", companyRequestDto.ContactNumber));
            sb.Append("<br />");

            if (!string.IsNullOrEmpty(companyRequestDto.EmailAddress))
            {
                sb.Append(string.Format("Email Address: {0}", companyRequestDto.EmailAddress));
            }
            sb.Append("<br />");
            sb.Append(string.Format("<li>Log on to {0} by clicking on this link <a href='{1}'>{1}</a></li>", ConfigurationManager.AppSettings["SiteName"], ConfigurationManager.AppSettings["SiteUrl"]));
            sb.Append("<li> Complete the request.</li>");
            sb.Append("</ol>");

            EmailHandler.SendEmailUsingExternalMailBox(smtpServerAddress, smtpPortNumber, accountUserName, accountPassword, fromAddress, toAddress, null, subject, sb.ToString());
        }

        #endregion
    }
}

