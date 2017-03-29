using Libraries.Common.Enums;
using Libraries.Common.Extensions;

using System.Data.SqlClient;

using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Categories.Mappers
{
    public class CategoryMappers
    {
        private static CategoryMappers _Instance;

        private CategoryMappers()
        {
        }

        public static CategoryMappers Instance
        {
            get
            {
                if (_Instance == null)
                {
                    _Instance = new CategoryMappers();
                }
                return _Instance;
            }
        }

        public CategoryDto MapToCategoryDto(SqlDataReader sqlDataReader)
        {
            CategoryDto categoryDto = new CategoryDto();

            categoryDto.Id = sqlDataReader["Id"].ToInteger();
            categoryDto.Name = sqlDataReader["Name"].ToString();
            categoryDto.Code = sqlDataReader["Code"].ToString();
            categoryDto.DisplayName = sqlDataReader["DisplayName"].ToString();
            categoryDto.CrudStatus = CrudStatus.UPDATE;

            return categoryDto;
        }
    }
}
