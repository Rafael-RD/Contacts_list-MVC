using Contacts_list.Models;

namespace Contacts_list.Services.Interfaces
{
    public interface IContactsService
    {
        Task CreateContact(ContactModel contact);
        Task<ContactModel?> GetContactById(int id);
        Task UpdateContact(ContactModel contact);
        Task DeleteContactById(int id);
    }
}
