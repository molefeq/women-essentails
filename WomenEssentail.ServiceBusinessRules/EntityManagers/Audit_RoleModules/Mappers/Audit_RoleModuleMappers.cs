using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Audit_RoleModules.Mappers
{
	public class Audit_RoleModuleMappers 
	{
		private static Audit_RoleModuleMappers _Instance;

		private Audit_RoleModuleMappers()
		{ 
		} 

		public static Audit_RoleModuleMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new Audit_RoleModuleMappers();
				}
				return _Instance;
			}
		}

		public Audit_RoleModuleDto MapToAudit_RoleModuleDto(SqlDataReader sqlDataReader)
		{
			Audit_RoleModuleDto audit_RoleModuleDto = new Audit_RoleModuleDto();

			audit_RoleModuleDto.Id = sqlDataReader["Id"].ToInteger();
			audit_RoleModuleDto.RoleModuleId = sqlDataReader["RoleModuleId"].ToInteger();
			audit_RoleModuleDto.ModuleId = sqlDataReader["ModuleId"].ToInteger();
			audit_RoleModuleDto.RoleId = sqlDataReader["RoleId"].ToInteger();
			audit_RoleModuleDto.StatusId = sqlDataReader["StatusId"].ToInteger();
			audit_RoleModuleDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
			audit_RoleModuleDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			audit_RoleModuleDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			audit_RoleModuleDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();

			return audit_RoleModuleDto;
		}

	}
}

