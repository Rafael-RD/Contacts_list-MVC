using Contacts_list.Models;

namespace Contacts_list.Services.Interfaces
{
    public interface IContactsService
    {
        Task CreateContact(ContactModel contact);
        Task<IEnumerable<ContactModel>> GetContacts();
        Task<ContactModel?> GetContactById(int id);
        Task<ContactModel?> UpdateContact(int id, ContactModel contact);
        Task<ContactModel?> DeleteContactById(int id);
    }
}
