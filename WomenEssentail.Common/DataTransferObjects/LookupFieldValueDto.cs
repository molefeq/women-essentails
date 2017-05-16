namespace WomenEssentail.Common.DataTransferObjects
{
    public class LookupFieldValueDto
    {
        public int? Id { get; set; }
        public int LookupFieldId { get; set; }
        public string FieldValue { get; set; }
    }
}
