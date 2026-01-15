const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const Tenant = require('../models/tenants.model');
const User = require('../models/users.model');
const Supplier = require('../models/supplier.model');

const tenantsData = [
    {
        name: 'ABC Corporation',
        address: 'Kolkata, India'
    },
    {
        name: 'QQQ Solutions',
        address: 'Delhi, India'
    },
    {
        name: 'Tech Technology',
        address: 'Bangalore, India'
    }
];

const ownersData = [
    {
        name: 'John Doe',
        email: 'john@abc.com',
        userType: 'Owner'
    },
    {
        name: 'Jane Doe',
        email: 'jane@qqq.com',
        userType: 'Owner'
    },
    {
        name: 'Jim Doe',
        email: 'jim@tech.com',
        userType: 'Owner'
    }
];

const suppliersData = [
    {
        name: 'supplier 1'
    },
    {
        name: 'supplier 2'
    },
    {
        name: 'supplier 3'
    }
];


async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        await User.deleteMany({});
        await Tenant.deleteMany({});
        await Supplier.deleteMany({});
        const password = process.env.DEFAULT_PASSWORD ;
        const hashedPassword = await bcrypt.hash(password, 10);

        const createdTenants = await Tenant.insertMany(tenantsData);
        console.log(`Created ${createdTenants.length} tenants`);

        const usersToCreate = createdTenants.map((tenant, index) => ({
            name: ownersData[index].name,
            email: ownersData[index].email,
            password: hashedPassword,
            tenantId: tenant._id,
            userType: ownersData[index].userType
        }));

        const createdUsers = await User.insertMany(usersToCreate);
        console.log(createdUsers.length);

        const suppliersToCreate = createdTenants.map((tenant, index) => ({
            name: suppliersData[index].name,
            tenantId: tenant._id
        }));

        const createdSuppliers = await Supplier.insertMany(suppliersToCreate);
        console.log(`Created ${createdSuppliers.length} suppliers`);

        console.log('dONE!');
    } catch (error) {
        console.error('ERROr:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

seed();
