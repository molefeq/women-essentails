using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Accounts.Mappers
{
	public class AccountMappers 
	{
		private static AccountMappers _Instance;

		private AccountMappers()
		{ 
		} 

		public static AccountMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new AccountMappers();
				}
				return _Instance;
			}
		}

		public AccountDto MapToAccountDto(SqlDataReader sqlDataReader)
		{
			AccountDto accountDto = new AccountDto();

			accountDto.Id = sqlDataReader["Id"].ToInteger();
			accountDto.AccountUserId = sqlDataReader["AccountUserId"].ToInteger();
			accountDto.IsFirstTimeLoggedInd = sqlDataReader["IsFirstTimeLoggedInd"].ToBoolean();
			accountDto.OrganisationId = sqlDataReader["OrganisationId"].ToInteger();
			accountDto.CompanyId = sqlDataReader["CompanyId"].ToInteger();
			accountDto.StatusId = sqlDataReader["StatusId"].ToInteger();
			accountDto.LastLoginDate = sqlDataReader["LastLoginDate"].ToDateTime();
			accountDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
			accountDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			accountDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			accountDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();
			accountDto.ExternalAuthenticationTypeId = sqlDataReader["ExternalAuthenticationTypeId"].ToInteger();
			accountDto.ForgotPasswordKey = sqlDataReader["ForgotPasswordKey"].ToGuid();

			return accountDto;
		}

	}
}

