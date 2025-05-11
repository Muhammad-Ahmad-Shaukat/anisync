from fastapi import FastAPI
from pydantic import BaseModel
from transformers import BertTokenizer, BertForSequenceClassification
import torch
from safetensors.torch import load_file
from torch.nn.functional import softmax

app = FastAPI()

# Load tokenizer
tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")

# Initialize model architecture
model = BertForSequenceClassification.from_pretrained("bert-base-uncased")

# Load weights from .safetensors
state_dict = load_file("./model.safetensors")
model.load_state_dict(state_dict)
model.eval()

# Set device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# Define request format
class InferenceRequest(BaseModel):
    context: str
    review: str

# Define inference endpoint
@app.post("/infer")
async def infer(data: InferenceRequest):
    # Combine inputs
    text = f"{data.context} [SEP] {data.review}"

    # Tokenize
    inputs = tokenizer(
        text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=512
    )
    inputs = {k: v.to(device) for k, v in inputs.items()}

    # Predict
    with torch.no_grad():
        outputs = model(**inputs)
        probs = softmax(outputs.logits, dim=-1)
        pred = torch.argmax(probs, dim=1).item()
        confidence = probs[0][pred].item()

    return {
        "label": "Spoiler" if pred == 1 else "Non-Spoiler",
        "confidence": round(confidence, 4)
    }
