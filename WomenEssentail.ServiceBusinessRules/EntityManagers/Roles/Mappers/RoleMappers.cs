using Libraries.Common.Extensions;

using System.Data.SqlClient;

using WomenEssentail.Common.DataTransferObjects;

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
            roleDto.Name = sqlDataReader["Name"].ToString();
            roleDto.Code = sqlDataReader["Code"].ToString();
            roleDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
			roleDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			roleDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			roleDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();

			return roleDto;
		}

	}
}

