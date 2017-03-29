using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.DashboardData
{
    public interface IDashboardDataManager
    {
        DashboardDataDto GetData(int? userId);
    }
}
