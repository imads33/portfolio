'use server'

export async function sendMessageToMadi(message: string) {
    if (!process.env.N8N_WEBHOOK_URL) {
        return { error: 'Chat service not configured' };
    }

    try {
        const response = await fetch(process.env.N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            // Log the actual error text for debugging
            const text = await response.text();
            console.error('N8N Error:', text);
            throw new Error('Failed to fetch response from Madi');
        }

        const data = await response.json();
        // Assuming n8n returns JSON with a 'text' or 'output' field. 
        // Adjust based on the actual workflow.
        return { response: data.text || data.output || data.message || "Thinking..." };
    } catch (error) {
        console.error('Chat Error:', error);
        return { error: 'Failed to connect to Madi.' };
    }
}
