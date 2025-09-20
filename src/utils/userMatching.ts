/**
 * Utility functions for matching users with their associated entities (athletes, coaches, academies, sponsors)
 */

export interface UserMatchableEntity {
  userId?: string;
  user?: any; // Can be ObjectId string or populated User object
  id?: string;
  _id?: string;
  [key: string]: any;
}

/**
 * Robust matching function that tries multiple strategies to find the entity associated with a user
 * @param entities - Array of entities to search through
 * @param user - The user object to match against
 * @returns The matched entity or undefined if no match found
 */
export function findEntityForUser<T extends UserMatchableEntity>(
  entities: T[], 
  user: { _id: string; email: string } | null | undefined
): T | undefined {
  if (!user?._id || !entities.length) return undefined;
  
  return entities.find(entity => {
    const entityData = entity as any;
    
    // Strategy 1: Direct userId match (for TypeScript interface compatibility)
    if (entity.userId === user._id) {
      return true;
    }
    
    // Strategy 2: Populated user object match (for MongoDB populated data)
    if (entityData.user && typeof entityData.user === 'object' && entityData.user._id === user._id) {
      return true;
    }
    
    // Strategy 3: User as string ID match (for ObjectId strings)
    if (entityData.user && typeof entityData.user === 'string' && entityData.user === user._id) {
      return true;
    }
    
    // Strategy 4: Email match as fallback (additional safety)
    if (entityData.user && typeof entityData.user === 'object' && entityData.user.email === user.email) {
      return true;
    }
    
    return false;
  });
}

/**
 * Find athlete for current user
 */
export function findAthleteForUser(athletes: UserMatchableEntity[], user: { _id: string; email: string } | null | undefined) {
  return findEntityForUser(athletes, user);
}

/**
 * Find coach for current user  
 */
export function findCoachForUser(coaches: UserMatchableEntity[], user: { _id: string; email: string } | null | undefined) {
  return findEntityForUser(coaches, user);
}

/**
 * Find academy for current user
 */
export function findAcademyForUser(academies: UserMatchableEntity[], user: { _id: string; email: string } | null | undefined) {
  return findEntityForUser(academies, user);
}

/**
 * Find sponsor for current user
 */
export function findSponsorForUser(sponsors: UserMatchableEntity[], user: { _id: string; email: string } | null | undefined) {
  return findEntityForUser(sponsors, user);
}