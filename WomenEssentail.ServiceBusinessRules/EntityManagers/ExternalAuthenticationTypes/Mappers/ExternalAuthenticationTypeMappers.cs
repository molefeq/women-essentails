using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.ExternalAuthenticationTypes.Mappers
{
	public class ExternalAuthenticationTypeMappers 
	{
		private static ExternalAuthenticationTypeMappers _Instance;

		private ExternalAuthenticationTypeMappers()
		{ 
		} 

		public static ExternalAuthenticationTypeMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new ExternalAuthenticationTypeMappers();
				}
				return _Instance;
			}
		}

		public ExternalAuthenticationTypeDto MapToExternalAuthenticationTypeDto(SqlDataReader sqlDataReader)
		{
			ExternalAuthenticationTypeDto externalAuthenticationTypeDto = new ExternalAuthenticationTypeDto();

			externalAuthenticationTypeDto.Id = sqlDataReader["Id"].ToInteger();

			return externalAuthenticationTypeDto;
		}

	}
}

