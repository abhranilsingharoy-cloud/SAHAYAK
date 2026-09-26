import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    "zones": [
      {"id": 1, "name": "Bundelkhand Region", "lat": 25.20, "lng": 79.13, "radius": 45, "severity": "CRITICAL", "incidents_30d": 28, "type": "Caste Violence"},
      {"id": 2, "name": "Agra District", "lat": 27.17, "lng": 78.01, "radius": 32, "severity": "HIGH", "incidents_30d": 19, "type": "Social Boycott"},
      {"id": 3, "name": "Varanasi District", "lat": 25.31, "lng": 82.97, "radius": 28, "severity": "HIGH", "incidents_30d": 15, "type": "Temple Entry Denial"},
      {"id": 4, "name": "Bhagalpur, Bihar", "lat": 25.24, "lng": 86.97, "radius": 22, "severity": "MEDIUM", "incidents_30d": 11, "type": "Land Dispute"},
      {"id": 5, "name": "Nanded, Maharashtra", "lat": 19.15, "lng": 77.32, "radius": 18, "severity": "MEDIUM", "incidents_30d": 9, "type": "Wage Discrimination"}
    ],
    "total_incidents_30d": 82,
    "last_updated": new Date().toISOString()
  };
  
  return NextResponse.json(data);
}
