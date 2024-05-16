using Contacts_list.Models;
using Microsoft.EntityFrameworkCore;

namespace Contacts_list.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<ContactModel> Contacts { get; set; }
    }
}
