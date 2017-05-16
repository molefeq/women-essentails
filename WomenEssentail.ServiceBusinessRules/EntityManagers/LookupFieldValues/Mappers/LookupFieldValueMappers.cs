using Libraries.Common.Extensions;

using System.Data.SqlClient;

using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.LookupFieldValues.Mappers
{
    public class LookupFieldValueMappers
    {

        private static LookupFieldValueMappers _instance;

        private LookupFieldValueMappers()
        {
        }

        public static LookupFieldValueMappers Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new LookupFieldValueMappers();
                }

                return _instance;
            }
        }
        
        public LookupFieldValueDto MapToLookupFieldValueDto(SqlDataReader sqlDataReader)
        {
            LookupFieldValueDto lookupFieldValueDto = new LookupFieldValueDto();

            lookupFieldValueDto.Id = sqlDataReader["Id"].ToInteger();
            lookupFieldValueDto.LookupFieldId = sqlDataReader["LookupFieldId"].ToInteger();
            lookupFieldValueDto.FieldValue = sqlDataReader["FieldValue"].ToString();

            return lookupFieldValueDto;
        }
    }
}
