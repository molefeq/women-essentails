using Libraries.Common.Email;
using Libraries.Common.Enums;
using Libraries.Common.ResponseObjects;

using System;
using System.Configuration;
using System.Text;

using WomenEssentail.Common.DataTransferObjects;

using WomenEssentail.ServiceBusinessRules.EntityManagers.ContactUss.Mappers;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.ContactUss
{
    public class ContactUsManager : IContactUsManager
    {

        public Response<ContactUsDto> Save(ContactUsDto contactUsDto)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                Response<ContactUsDto> response = unitOfWork.ContactUs.Save(contactUsDto, ContactUsMappers.Instance.MapToContactUsDto);

                if (contactUsDto.CrudStatus == CrudStatus.CREATE)
                {
                    SendContactUsEmail(contactUsDto);
                }

                return response;
            }
        }

        #region Private Methods

        private void SendContactUsEmail(ContactUsDto contactUsDto)
        {

            string smtpServerAddress = ConfigurationManager.AppSettings["LiveSMTPAddress"];
            int smtpPortNumber = Convert.ToInt32(ConfigurationManager.AppSettings["LiveSMTPPortNumber"]);
            string fromAddress = ConfigurationManager.AppSettings["LiveEmailFrom"];
            string toAddress = ConfigurationManager.AppSettings["LiveEmailReciever"];
            string accountUserName = ConfigurationManager.AppSettings["LiveAccountUsername"];
            string accountPassword = ConfigurationManager.AppSettings["LiveAccountPassword"];

            string subject = string.Format("{0} Email notification ... {0}!", contactUsDto.Subject);

            StringBuilder sb = new StringBuilder();

            // Add email heading
            sb.Append(string.Format("{0}.", contactUsDto.Message));

            EmailHandler.SendEmailUsingExternalMailBox(smtpServerAddress, smtpPortNumber, accountUserName, accountPassword, fromAddress, toAddress, null, subject, sb.ToString());
        }

        #endregion
    }
}

