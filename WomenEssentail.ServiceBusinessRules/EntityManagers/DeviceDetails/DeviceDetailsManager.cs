using Libraries.Common.ResponseObjects;

using WomenEssentail.Common.DataTransferObjects;

using WomenEssentail.ServiceBusinessRules.EntityManagers.DeviceDetails.Mappers;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.DeviceDetails
{
    public class DeviceDetailsManager : IDeviceDetailsManager
    {
        public Response<DeviceDetailsDto> Save(DeviceDetailsDto deviceDetailsDto)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.DeviceDetails.Save(deviceDetailsDto, DeviceDetailsMappers.Instance.MapToDeviceDetailsDto);
            }
        }

    }
}

