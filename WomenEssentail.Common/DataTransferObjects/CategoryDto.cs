using Libraries.Common.Enums;

namespace WomenEssentail.Common.DataTransferObjects
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string DisplayName { get; set; }
        public CrudStatus CrudStatus { get; set; }
    }
}
