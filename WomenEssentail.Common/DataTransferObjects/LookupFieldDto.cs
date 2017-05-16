using System.Collections.Generic;

namespace WomenEssentail.Common.DataTransferObjects
{
    public class LookupFieldDto
    {
        public int? Id { get; set; }
        public string FieldName { get; set; }
        public List<LookupFieldValueDto> LookupFieldValues { get; set; }

        public LookupFieldDto()
        {
            LookupFieldValues = new List<LookupFieldValueDto>();
        }
    }
}
