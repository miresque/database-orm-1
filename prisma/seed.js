const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    const createdCustomer = await prisma.customer.create({
        data: {
            name: 'Alice'
        }
    });

    console.log('Customer created', createdCustomer);

    // Add your code here
    const createdContact = await prisma.contact.create({
        data: {
            phone: '0987654321',
            email: 'alice@wonder.land',
            customerId: createdCustomer.id
        }
    })
    console.log('Contact created', createdContact);
    
    const createdMovie = await prisma.movie.create({
        data: {
            title: 'Matrix',
            runtimeMins: 136,
        }
    })
    console.log('Movie created', createdMovie);
    
    const createdScreen = await prisma.screen.create({
        data: {
            number: 1,
            seats: {
                create: { number: 1, row: 'A'}
            }
        },
        include: {
            seats: true
        }
    })
    console.log('Screen created', createdScreen);

    const createdScreening = await prisma.screening.create({
        data: {
            startsAt: '1999-06-11T19:20:30.451Z',
            movieId: createdMovie.id,
            screenId: createdScreen.id
        }
    })
    console.log('Screening created', createdScreening);

    const createdTicket = await prisma.ticket.create({
        data: {
            screeningId: createdScreening.id,
            customerId: createdCustomer.id
        }
    })
    console.log('Ticket created', createdTicket);

    // Don't edit any of the code below this line
    process.exit(0);
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })
