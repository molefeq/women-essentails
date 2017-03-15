using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Audit_Accounts.Mappers
{
	public class Audit_AccountMappers 
	{
		private static Audit_AccountMappers _Instance;

		private Audit_AccountMappers()
		{ 
		} 

		public static Audit_AccountMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new Audit_AccountMappers();
				}
				return _Instance;
			}
		}

		public Audit_AccountDto MapToAudit_AccountDto(SqlDataReader sqlDataReader)
		{
			Audit_AccountDto audit_AccountDto = new Audit_AccountDto();

			audit_AccountDto.Id = sqlDataReader["Id"].ToInteger();
			audit_AccountDto.AccountId = sqlDataReader["AccountId"].ToInteger();
			audit_AccountDto.AccountUserId = sqlDataReader["AccountUserId"].ToInteger();
			audit_AccountDto.IsFirstTimeLoggedInd = sqlDataReader["IsFirstTimeLoggedInd"].ToBoolean();
			audit_AccountDto.OrganisationId = sqlDataReader["OrganisationId"].ToInteger();
			audit_AccountDto.CompanyId = sqlDataReader["CompanyId"].ToInteger();
			audit_AccountDto.StatusId = sqlDataReader["StatusId"].ToInteger();
			audit_AccountDto.LastLoginDate = sqlDataReader["LastLoginDate"].ToDateTime();
			audit_AccountDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
			audit_AccountDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			audit_AccountDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			audit_AccountDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();
			audit_AccountDto.ExternalAuthenticationTypeId = sqlDataReader["ExternalAuthenticationTypeId"].ToInteger();
			audit_AccountDto.ForgotPasswordKey = sqlDataReader["ForgotPasswordKey"].ToGuid();

			return audit_AccountDto;
		}

	}
}

