import { getCurrentLocation, enableLocationRequest, Location } from '@nativescript/geolocation';

export class LocationService {
  static async getCurrentLocation(): Promise<{ latitude: number; longitude: number }> {
    try {
      // Default location (Los Angeles) in case we can't get the actual location
      const defaultLocation = {
        latitude: 34.0522,
        longitude: -118.2437
      };
      
      try {
        const hasPermission = await enableLocationRequest(true);
        if (!hasPermission) {
          console.log('Location permission denied, using default location');
          return defaultLocation;
        }
      } catch (permissionError) {
        console.error('Error requesting location permission:', permissionError);
        return defaultLocation;
      }

      try {
        const location: Location = await getCurrentLocation({
          desiredAccuracy: 3,
          maximumAge: 5000,
          timeout: 10000 // Reduced timeout to avoid long waits
        });

        console.log('Location obtained:', location);
        
        return {
          latitude: location.latitude,
          longitude: location.longitude
        };
      } catch (locationError) {
        console.error('Error getting current location:', locationError);
        return defaultLocation;
      }
    } catch (error) {
      console.error('Unexpected error in getCurrentLocation:', error);
      // Return default location on any error
      return {
        latitude: 34.0522,
        longitude: -118.2437
      };
    }
  }

  static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    try {
      const R = 6371; // Earth's radius in km
      const dLat = this.toRad(lat2 - lat1);
      const dLon = this.toRad(lon2 - lon1);
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      return R * c;
    } catch (error) {
      console.error('Error calculating distance:', error);
      return 0; // Return 0 on error
    }
  }

  private static toRad(degrees: number): number {
    return degrees * Math.PI / 180;
  }
}