export const generateTestCasesFromPrompt = async (prompt: string) => {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert QA engineer. Generate 2-3 structured test cases from the user\'s input. Return JSON in this format: [{ title, steps, expected, tags, status, category }]',
        },
        { role: 'user', content: prompt },
      ],
    }),
  });

  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
};

