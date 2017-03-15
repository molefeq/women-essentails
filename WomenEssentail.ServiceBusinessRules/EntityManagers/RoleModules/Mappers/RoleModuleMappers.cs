using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

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
			roleModuleDto.RoleId = sqlDataReader["RoleId"].ToInteger();
			roleModuleDto.StatusId = sqlDataReader["StatusId"].ToInteger();
			roleModuleDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
			roleModuleDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			roleModuleDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			roleModuleDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();

			return roleModuleDto;
		}

	}
}

