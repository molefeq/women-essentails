using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Modules.Mappers
{
	public class ModuleMappers 
	{
		private static ModuleMappers _Instance;

		private ModuleMappers()
		{ 
		} 

		public static ModuleMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new ModuleMappers();
				}
				return _Instance;
			}
		}

		public ModuleDto MapToModuleDto(SqlDataReader sqlDataReader)
		{
			ModuleDto moduleDto = new ModuleDto();

			moduleDto.Id = sqlDataReader["Id"].ToInteger();
			moduleDto.ParentModuleId = sqlDataReader["ParentModuleId"].ToInteger();
			moduleDto.StatusId = sqlDataReader["StatusId"].ToInteger();
			moduleDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
			moduleDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			moduleDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			moduleDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();

			return moduleDto;
		}

	}
}

