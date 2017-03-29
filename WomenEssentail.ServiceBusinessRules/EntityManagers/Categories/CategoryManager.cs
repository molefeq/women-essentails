using Libraries.Common.ResponseObjects;

using WomenEssentail.Common.DataFilters;
using WomenEssentail.Common.DataTransferObjects;

using WomenEssentail.ServiceBusinessRules.EntityManagers.Categories.Mappers;


namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Categories
{
    public class CategoryManager: ICategoryManager
    {
        public Result<CategoryDto> GetCategories(SearchFilter searchFilter)
        {
            using (UnitOfWork unitOfWork = new UnitOfWork())
            {
                return unitOfWork.Categories.Get(searchFilter, CategoryMappers.Instance.MapToCategoryDto);
            }
        }
    }
}
