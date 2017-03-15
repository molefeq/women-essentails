using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.AccountRoles.Mappers
{
	public class AccountRoleMappers 
	{
		private static AccountRoleMappers _Instance;

		private AccountRoleMappers()
		{ 
		} 

		public static AccountRoleMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new AccountRoleMappers();
				}
				return _Instance;
			}
		}

		public AccountRoleDto MapToAccountRoleDto(SqlDataReader sqlDataReader)
		{
			AccountRoleDto accountRoleDto = new AccountRoleDto();

			accountRoleDto.Id = sqlDataReader["Id"].ToInteger();
			accountRoleDto.AccountId = sqlDataReader["AccountId"].ToInteger();
			accountRoleDto.RoleId = sqlDataReader["RoleId"].ToInteger();
			accountRoleDto.StatusId = sqlDataReader["StatusId"].ToInteger();
			accountRoleDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
			accountRoleDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			accountRoleDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			accountRoleDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();

			return accountRoleDto;
		}

	}
}

