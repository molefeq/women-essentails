using Libraries.Common.ResponseObjects;
using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Roles
{
	public interface IRoleManager 
	{
        Result<RoleDto> GetRoles(SearchFilter searchFilter);

    }
}

