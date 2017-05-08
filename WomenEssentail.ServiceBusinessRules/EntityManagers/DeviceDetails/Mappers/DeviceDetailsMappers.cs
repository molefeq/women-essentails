using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.DeviceDetails.Mappers
{
	public class DeviceDetailsMappers 
	{
		private static DeviceDetailsMappers _Instance;

		private DeviceDetailsMappers()
		{ 
		} 

		public static DeviceDetailsMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new DeviceDetailsMappers();
				}
				return _Instance;
			}
		}

		public DeviceDetailsDto MapToDeviceDetailsDto(SqlDataReader sqlDataReader)
		{
			DeviceDetailsDto deviceDetailsDto = new DeviceDetailsDto();

			deviceDetailsDto.Id = sqlDataReader["Id"].ToInteger();
            deviceDetailsDto.DeviceId = sqlDataReader["DeviceId"].ToString();
            deviceDetailsDto.DeviceName = sqlDataReader["DeviceName"].ToString();
            deviceDetailsDto.DevicePlatform = sqlDataReader["DevicePlatform"].ToString();
            deviceDetailsDto.DeviceSerialNumber = sqlDataReader["DeviceSerialNumber"].ToString();
            deviceDetailsDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();

			return deviceDetailsDto;
		}

	}
}

