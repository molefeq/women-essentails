using Libraries.Common.Enums;
using Libraries.Common.Extensions;

using System.Data.SqlClient;

using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.SubCategories.Mappers
{
    public class SubCategoryMappers
    {
        private static SubCategoryMappers _Instance;

        private SubCategoryMappers()
        {
        }

        public static SubCategoryMappers Instance
        {
            get
            {
                if (_Instance == null)
                {
                    _Instance = new SubCategoryMappers();
                }
                return _Instance;
            }
        }

        public SubCategoryDto MapToSubCategoryDto(SqlDataReader sqlDataReader)
        {
            SubCategoryDto subCategoryDto = new SubCategoryDto();

            subCategoryDto.Id = sqlDataReader["Id"].ToInteger();
            subCategoryDto.CategoryId = sqlDataReader["CategoryId"].ToInteger();
            subCategoryDto.Name = sqlDataReader["Name"].ToString();
            subCategoryDto.Code = sqlDataReader["Code"].ToString();
            subCategoryDto.DisplayName = sqlDataReader["DisplayName"].ToString();
            subCategoryDto.StatusId = sqlDataReader["StatusId"].ToInteger();
            subCategoryDto.StatusName = sqlDataReader["StatusName"].ToString();
            subCategoryDto.StatusCode = sqlDataReader["StatusCode"].ToString();
            subCategoryDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
            subCategoryDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();
            subCategoryDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
            subCategoryDto.EditDate = sqlDataReader["EditDate"].ToDateTime();

            subCategoryDto.CrudStatus = CrudStatus.UPDATE;

            return subCategoryDto;
        }
    }
}
