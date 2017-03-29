using Libraries.Common.ResponseObjects;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Categories
{
    public interface ICategoryManager
    {
        Result<CategoryDto> GetCategories(SearchFilter searchFilter);
    }
}