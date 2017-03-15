using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Audit_Modules.Mappers
{
	public class Audit_ModuleMappers 
	{
		private static Audit_ModuleMappers _Instance;

		private Audit_ModuleMappers()
		{ 
		} 

		public static Audit_ModuleMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new Audit_ModuleMappers();
				}
				return _Instance;
			}
		}

		public Audit_ModuleDto MapToAudit_ModuleDto(SqlDataReader sqlDataReader)
		{
			Audit_ModuleDto audit_ModuleDto = new Audit_ModuleDto();

			audit_ModuleDto.Id = sqlDataReader["Id"].ToInteger();
			audit_ModuleDto.ModuleId = sqlDataReader["ModuleId"].ToInteger();
			audit_ModuleDto.ParentModuleId = sqlDataReader["ParentModuleId"].ToInteger();
			audit_ModuleDto.StatusId = sqlDataReader["StatusId"].ToInteger();
			audit_ModuleDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
			audit_ModuleDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			audit_ModuleDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			audit_ModuleDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();

			return audit_ModuleDto;
		}

	}
}

