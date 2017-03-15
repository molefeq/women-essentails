using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WomenEssentail.ServiceBusinessRules.Utilities
{
    public class ErrorLogger
    {

        private static ErrorLogger _instance;

        private ErrorLogger()
        {
        }

        public static ErrorLogger Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new ErrorLogger();
                }

                return _instance;
            }
        }

        public void Log()
        {
            ILog log = log4net.LogManager.GetLogger(typeof(EACController));

        }
    }
}
