import { NextResponse } from 'next/server';

export async function GET() {
  const data = [
    {"state": "Uttar Pradesh", "lat": 26.85, "lng": 80.91, "incidents": 145, "severity": "HIGH"},
    {"state": "Madhya Pradesh", "lat": 22.97, "lng": 78.65, "incidents": 112, "severity": "HIGH"},
    {"state": "Bihar", "lat": 25.09, "lng": 85.31, "incidents": 98, "severity": "MEDIUM"},
    {"state": "Rajasthan", "lat": 27.02, "lng": 74.21, "incidents": 87, "severity": "MEDIUM"},
    {"state": "Maharashtra", "lat": 19.66, "lng": 75.31, "incidents": 76, "severity": "MEDIUM"},
    {"state": "Gujarat", "lat": 22.25, "lng": 71.19, "incidents": 54, "severity": "LOW"},
    {"state": "Karnataka", "lat": 15.31, "lng": 75.71, "incidents": 48, "severity": "LOW"},
    {"state": "Tamil Nadu", "lat": 10.79, "lng": 78.65, "incidents": 42, "severity": "LOW"},
    {"state": "Andhra Pradesh", "lat": 15.91, "lng": 79.73, "incidents": 38, "severity": "LOW"},
    {"state": "Telangana", "lat": 17.86, "lng": 79.09, "incidents": 31, "severity": "LOW"}
  ];
  
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    }
  });
}
