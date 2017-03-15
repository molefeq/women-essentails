using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Roles.Mappers
{
	public class RoleMappers 
	{
		private static RoleMappers _Instance;

		private RoleMappers()
		{ 
		} 

		public static RoleMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new RoleMappers();
				}
				return _Instance;
			}
		}

		public RoleDto MapToRoleDto(SqlDataReader sqlDataReader)
		{
			RoleDto roleDto = new RoleDto();

			roleDto.Id = sqlDataReader["Id"].ToInteger();
			roleDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
			roleDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			roleDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			roleDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();

			return roleDto;
		}

	}
}

