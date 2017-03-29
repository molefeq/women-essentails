using Libraries.Common.ResponseObjects;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;

using WomenEssentail.ServiceBusinessRules.EntityManagers.Roles.Mappers;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Roles
{
    public class RoleManager : IRoleManager
    {
        public Result<RoleDto> GetRoles(SearchFilter searchFilter)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.Roles.Get(searchFilter, RoleMappers.Instance.MapToRoleDto);
            }
        }
    }
}

