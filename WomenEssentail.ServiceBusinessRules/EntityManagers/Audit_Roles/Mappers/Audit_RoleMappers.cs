using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Audit_Roles.Mappers
{
	public class Audit_RoleMappers 
	{
		private static Audit_RoleMappers _Instance;

		private Audit_RoleMappers()
		{ 
		} 

		public static Audit_RoleMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new Audit_RoleMappers();
				}
				return _Instance;
			}
		}

		public Audit_RoleDto MapToAudit_RoleDto(SqlDataReader sqlDataReader)
		{
			Audit_RoleDto audit_RoleDto = new Audit_RoleDto();

			audit_RoleDto.Id = sqlDataReader["Id"].ToInteger();
			audit_RoleDto.RoleId = sqlDataReader["RoleId"].ToInteger();
			audit_RoleDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
			audit_RoleDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			audit_RoleDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			audit_RoleDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();

			return audit_RoleDto;
		}

	}
}

