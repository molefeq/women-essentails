using Libraries.Common.Extensions;

using System.Data.SqlClient;

using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.RoleModules.Mappers
{
    public class RoleModuleMappers 
	{
		private static RoleModuleMappers _Instance;

		private RoleModuleMappers()
		{ 
		} 

		public static RoleModuleMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new RoleModuleMappers();
				}
				return _Instance;
			}
		}

		public RoleModuleDto MapToRoleModuleDto(SqlDataReader sqlDataReader)
		{
			RoleModuleDto roleModuleDto = new RoleModuleDto();

			roleModuleDto.Id = sqlDataReader["Id"].ToInteger();
			roleModuleDto.ModuleId = sqlDataReader["ModuleId"].ToInteger();
            roleModuleDto.ModuleName = sqlDataReader["ModuleName"].ToString();
            roleModuleDto.ModuleUrl = sqlDataReader["ModuleUrl"].ToString();
            roleModuleDto.RoleId = sqlDataReader["RoleId"].ToInteger();
            roleModuleDto.RoleName = sqlDataReader["RoleName"].ToString();
            roleModuleDto.StatusId = sqlDataReader["StatusId"].ToInteger();
			roleModuleDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
			roleModuleDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			roleModuleDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			roleModuleDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();

			return roleModuleDto;
		}

	}
}

