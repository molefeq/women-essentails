using WomenEssentail.Common.DataTransferObjects;
using WomenEssentail.ServiceBusinessRules.EntityManagers.DashboardData.Mappers;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.DashboardData
{
    public class DashboardDataManager: IDashboardDataManager
    {
        public DashboardDataDto GetData(int? userId)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.Dashboards.GetData(userId, DashboardDataMapper.Instance.MapToDashboardDataDto);
            }
        }
    }
}
