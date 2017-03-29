using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WomenEssentail.Common.DataTransferObjects
{
    public class ChangePasswordDto
    {
        public object OldPassword { get; set; }
        public object Password { get; set; }
        public object Username { get; set; }
    }
}
