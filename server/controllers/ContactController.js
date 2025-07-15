import Contact from '../models/ContactModel.js';

class ContactController {
  async create(req, res) {
    try {
      const contact = new Contact(req.body);
      await contact.save();
      res.status(201).json(contact);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getAll(req, res) {
    try {
      const contacts = await Contact.find();
      res.json(contacts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async delete(req, res) {
    try {
      const contact = await Contact.findById(req.params.id);
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      await contact.remove();
      res.json({ message: 'Contact deleted successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default new ContactController();