import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import GlobalApi from '../Services/GlobalApi';

function FavoriteButton({ movieId, initialIsFavorite = false }) {
    const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
    const queryClient = useQueryClient();

    const toggleFavoriteMutation = useMutation({
        mutationFn: async () => {
            if (isFavorite) {
                return GlobalApi.removeFromFavorites(movieId);
            } else {
                return GlobalApi.addToFavorites(movieId);
            }
        },
        onMutate: async () => {
            // Optimistic update
            setIsFavorite(!isFavorite);
        },
        onSuccess: () => {
            // Invalidate relevant queries
            queryClient.invalidateQueries({ queryKey: ['favorites'] });
            queryClient.invalidateQueries({ queryKey: ['movies'] });
        },
        
    });

    const handleToggleFavorite = () => {
        toggleFavoriteMutation.mutate();
    };

    return (
        <button
            onClick={handleToggleFavorite}
            disabled={toggleFavoriteMutation.isPending}
            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
            style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: toggleFavoriteMutation.isPending ? 'not-allowed' : 'pointer',
                backgroundColor: isFavorite ? '#e50914' : '#333',
                color: 'white',
                fontSize: '20px',
                opacity: toggleFavoriteMutation.isPending ? 0.6 : 1
            }}
        >
            {toggleFavoriteMutation.isPending ? '...' : isFavorite ? '❤️' : '🤍'}
        </button>
    );
}

export default FavoriteButton;