import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { getCurrentUser } from '@/lib/auth';
import { EventStatus } from '@/types';

// GET /api/events - list events (simple version for now)
export async function GET() {
  const db = await getDb();
  const events = await db
    .collection('events')
    .find({})
    .sort({ createdAt: -1 })
    .limit(50)
    .toArray();

  return NextResponse.json({ success: true, data: events });
}

// POST /api/events - create new event (requires auth)
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'You must be signed in to create an event' } },
        { status: 401 },
      );
    }

    const body = await req.json();
    const {
      name,
      category,
      shortDescription,
      startDate,
      endDate,
      venueName,
      venueCity,
      venueState,
      venueAddress,
      ageRestriction,
      tickets,
    } = body as Record<string, unknown>;

    if (!name || !category || !shortDescription || !startDate || !venueName) {
      return NextResponse.json(
        { success: false, error: { code: 'VALIDATION_ERROR', message: 'Missing required fields' } },
        { status: 400 },
      );
    }

    const db = await getDb();

    const now = new Date().toISOString();
    const slugBase = String(name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    const slug = `${slugBase}-${Date.now().toString(36)}`;

    const eventDoc = {
      _id: crypto.randomUUID(),
      slug,
      name,
      shortDescription,
      fullDescription: shortDescription,
      category,
      status: EventStatus.DRAFT,
      heroImage: null,
      startDate,
      endDate: endDate || startDate,
      timezone: 'UTC',
      venue: {
        name: venueName,
        address: {
          street: venueAddress || '',
          city: venueCity || '',
          state: venueState || '',
          zip: '',
          country: 'USA',
        },
        capacity: 0,
        amenities: [],
      },
      isOnline: false,
      ageRestriction: ageRestriction || 'all_ages',
      tags: [],
      seatingType: 'general',
      priceRange: {
        min: 0,
        max: 0,
        currency: 'USD',
      },
      ticketTypes: tickets || [],
      totalCapacity: 0,
      ticketsSold: 0,
      organizerId: user.id,
      createdAt: now,
      updatedAt: now,
    };

    await db.collection('events').insertOne(eventDoc);

    return NextResponse.json({ success: true, data: { id: eventDoc._id, slug: eventDoc.slug } }, { status: 201 });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Create event error', error);
    return NextResponse.json(
      { success: false, error: { code: 'SERVER_ERROR', message: 'Something went wrong' } },
      { status: 500 },
    );
  }
}


