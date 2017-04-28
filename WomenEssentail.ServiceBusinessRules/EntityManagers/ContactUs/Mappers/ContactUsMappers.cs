using Libraries.Common.Enums;
using Libraries.Common.Extensions;

using System.Data.SqlClient;

using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.ContactUss.Mappers
{
    public class ContactUsMappers 
	{
		private static ContactUsMappers _Instance;

		private ContactUsMappers()
		{ 
		} 

		public static ContactUsMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new ContactUsMappers();
				}
				return _Instance;
			}
		}

		public ContactUsDto MapToContactUsDto(SqlDataReader sqlDataReader)
		{
			ContactUsDto contactUsDto = new ContactUsDto();

            contactUsDto.Id = sqlDataReader["Id"].ToInteger();
            contactUsDto.Subject = sqlDataReader["Subject"].ToString();
            contactUsDto.Message = sqlDataReader["Message"].ToString();
            contactUsDto.EmailAddress = sqlDataReader["EmailAddress"].ToString();
            contactUsDto.CrudStatus = CrudStatus.UPDATE;

            return contactUsDto;
		}

	}
}

