using Libraries.Common.ResponseObjects;
using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.DeviceDetails
{
    public interface IDeviceDetailsManager
    {
        Response<DeviceDetailsDto> Save(DeviceDetailsDto deviceDetailsDto);
        Response<DeviceDetailsDto> CompanyGoThere(int companyId, string deviceId);
    }
}

