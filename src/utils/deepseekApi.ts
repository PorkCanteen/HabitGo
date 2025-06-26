import { getToken } from "./tokenUtils";

/**
 * 调用 DeepSeek API
 * @param message - 要发送的消息
 * @returns Promise<string | null> - 返回AI回复或null（失败时）
 */
export async function chatWithDeepSeek(message: string): Promise<string | null> {
    try {
        const userToken = getToken(); // 获取用户token
        
        const response = await fetch('/api/chat/deepseek', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}` // JWT token
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();
        
        if (data.code === '200') {
            console.log('DeepSeek API 返回值:', data.data.reply);
            return data.data.reply;
        } else {
            console.error('API调用失败:', data.message);
            return null;
        }
        
    } catch (error) {
        console.error('网络错误:', error);
        return null;
    }
}

/**
 * DeepSeek API 调用的快捷方法
 */
export const DeepSeekAPI = {
    /**
     * 发送消息并获取回复
     */
    chat: chatWithDeepSeek,
    
    /**
     * 获取习惯建议
     */
    getHabitSuggestion: async (habitName: string) => {
        const message = `请为习惯"${habitName}"提供一些建议和指导`;
        return await chatWithDeepSeek(message);
    },
    
    /**
     * 生成习惯描述
     */
    generateHabitDescription: async (habitName: string) => {
        const message = `为习惯"${habitName}"生成一段简洁有用的描述，包括：好处、注意事项、执行建议（50字以内）`;
        return await chatWithDeepSeek(message);
    },
    
    /**
     * 分析习惯数据
     */
    analyzeHabitData: async (habitData: unknown) => {
        const message = `基于以下习惯数据进行分析并给出建议：${JSON.stringify(habitData)}`;
        return await chatWithDeepSeek(message);
    }
}; 