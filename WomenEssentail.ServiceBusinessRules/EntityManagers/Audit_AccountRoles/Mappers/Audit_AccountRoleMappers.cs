using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Audit_AccountRoles.Mappers
{
	public class Audit_AccountRoleMappers 
	{
		private static Audit_AccountRoleMappers _Instance;

		private Audit_AccountRoleMappers()
		{ 
		} 

		public static Audit_AccountRoleMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new Audit_AccountRoleMappers();
				}
				return _Instance;
			}
		}

		public Audit_AccountRoleDto MapToAudit_AccountRoleDto(SqlDataReader sqlDataReader)
		{
			Audit_AccountRoleDto audit_AccountRoleDto = new Audit_AccountRoleDto();

			audit_AccountRoleDto.Id = sqlDataReader["Id"].ToInteger();
			audit_AccountRoleDto.AccountRoleId = sqlDataReader["AccountRoleId"].ToInteger();
			audit_AccountRoleDto.AccountId = sqlDataReader["AccountId"].ToInteger();
			audit_AccountRoleDto.RoleId = sqlDataReader["RoleId"].ToInteger();
			audit_AccountRoleDto.StatusId = sqlDataReader["StatusId"].ToInteger();
			audit_AccountRoleDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
			audit_AccountRoleDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			audit_AccountRoleDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			audit_AccountRoleDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();

			return audit_AccountRoleDto;
		}

	}
}

