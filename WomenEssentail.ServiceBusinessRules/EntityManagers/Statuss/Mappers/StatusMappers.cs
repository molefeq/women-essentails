using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Statuss.Mappers
{
	public class StatusMappers 
	{
		private static StatusMappers _Instance;

		private StatusMappers()
		{ 
		} 

		public static StatusMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new StatusMappers();
				}
				return _Instance;
			}
		}

		public StatusDto MapToStatusDto(SqlDataReader sqlDataReader)
		{
			StatusDto statusDto = new StatusDto();

			statusDto.Id = sqlDataReader["Id"].ToInteger();

			return statusDto;
		}

	}
}

