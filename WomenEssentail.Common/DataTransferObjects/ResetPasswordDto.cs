using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WomenEssentail.Common.DataTransferObjects
{
    public class ResetPasswordDto
    {
        public object ForgotPasswordKey { get; set; }
        public object Password { get; set; }
    }
}
