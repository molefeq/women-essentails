using Libraries.Common.Extensions;

using System.Data.SqlClient;

using WomenEssentail.Common.DataTransferObjects;
using WomenEssentail.ServiceBusinessRules.EntityManagers.LookupFieldValues.Mappers;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.LookupFields.Mappers
{
    public class LookupFieldMappers
    {

        private static LookupFieldMappers _instance;

        private LookupFieldMappers()
        {
        }

        public static LookupFieldMappers Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new LookupFieldMappers();
                }

                return _instance;
            }
        }

        public LookupFieldDto MapLookupFieldsFetchQuery(SqlDataReader sqlDataReader)
        {
            LookupFieldDto lookupFieldDto = MapToLookupFieldDto(sqlDataReader);

            sqlDataReader.NextResult();

            while (sqlDataReader.Read())
            {
                lookupFieldDto.LookupFieldValues.Add(LookupFieldValueMappers.Instance.MapToLookupFieldValueDto(sqlDataReader));
            }

            return lookupFieldDto;
        }

        public LookupFieldDto MapToLookupFieldDto(SqlDataReader sqlDataReader)
        {
            LookupFieldDto lookupFieldDto = new LookupFieldDto();

            lookupFieldDto.Id = sqlDataReader["Id"].ToInteger();
            lookupFieldDto.FieldName = sqlDataReader["FieldName"].ToString();

            return lookupFieldDto;
        }
    }
}
