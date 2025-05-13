from fastapi import FastAPI
from pydantic import BaseModel
from transformers import BertTokenizer, BertForSequenceClassification, BertConfig
import torch
from safetensors.torch import load_file
from torch.nn.functional import softmax
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Replace with your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Load custom config if available
config = BertConfig.from_json_file("./config.json")  # Make sure config.json exists

# Load tokenizer (you can change to a fine-tuned tokenizer if needed)
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")

# Initialize model architecture using config
model = BertForSequenceClassification(config)

# Load weights from safetensors
state_dict = load_file("./model.safetensors")
model.load_state_dict(state_dict)
model.eval()

# Move model to GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# Define the input schema
class InferenceRequest(BaseModel):
    context: str
    review: str

# Inference endpoint
@app.post("/infer")
async def infer(data: InferenceRequest):
    # Combine context and review properly (let tokenizer handle sentence pairs)
    inputs = tokenizer(
        data.context,
        data.review,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=512
    )
    inputs = {k: v.to(device) for k, v in inputs.items()}

    # Inference
    with torch.no_grad():
        outputs = model(**inputs)
        probs = softmax(outputs.logits, dim=-1)
        pred = torch.argmax(probs, dim=1).item()
        confidence = probs[0][pred].item()

    # Set a threshold for confidence
    threshold = 0.90
    label = "Spoiler" if pred == 1 and confidence >= threshold else "Uncertain"
    print(confidence, label)
    
    return {
        "label": label,
        "confidence": round(confidence, 4)
    }
