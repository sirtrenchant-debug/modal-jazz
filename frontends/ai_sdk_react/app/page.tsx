"use client";
      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {!hasMessages ? (
          <EmptyState onSend={handleSend} />
        ) : (
          <div className="w-[48rem] mx-auto px-4 py-6 flex flex-col gap-4">
            {messages.map((m) => (
              <MessageBubble
                key={m.id}
                message={m}
                isStreaming={
                  status === "streaming" &&
                  m === messages[messages.length - 1] &&
                  m.role === "assistant"
                }
              />
            ))}
            {status === "submitted" && <ThinkingIndicator />}
          </div>
        )}
      </div>


      {/* Input area */}
      <div className="border-t border-border">
        <div className="w-full px-4 py-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex gap-3 items-end w-[48rem] mx-auto"
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(input);
                }
              }}
              placeholder="Send a message..."
              disabled={isLoading}
              rows={1}
              className="flex-1 bg-bg-container border border-border rounded-xl px-4 py-3 text-sm text-text-primary placeholder:text-text-primary/30 focus:outline-none focus:border-green-bright/50 resize-none disabled:opacity-40 transition-colors"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-green-bright text-bg-base font-medium rounded-xl px-5 py-3 text-sm hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

